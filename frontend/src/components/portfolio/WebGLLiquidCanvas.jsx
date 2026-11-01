import React, { useEffect, useRef } from 'react';

/**
 * WebGLLiquidCanvas
 * A high-performance 60fps WebGL canvas running a custom GLSL fragment shader.
 * Renders domain-warped liquid ribbons in Jet Black (#0B0B0B), Hot Pink (#FF2DAB),
 * and Chartreuse (#D4FF3F) that fluidly react to cursor movement and time.
 */
export default function WebGLLiquidCanvas({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Attempt WebGL context
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported, falling back to CSS background');
      return;
    }

    // Vertex shader source
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader source with domain-warped noise & fluid liquid ribbons
    const fsSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;

      // Fast simplex / sin pseudo-noise functions
      vec2 hash2(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                       dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
                   mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                       dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
      }

      // Fractional Brownian Motion with domain warping
      float fbm(vec2 p) {
        float f = 0.0;
        f += 0.5000 * noise(p); p = p * 2.02;
        f += 0.2500 * noise(p); p = p * 2.03;
        f += 0.1250 * noise(p); p = p * 2.01;
        f += 0.0625 * noise(p);
        return f;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;

        vec2 mouse = u_mouse / u_resolution.xy;
        mouse.x *= u_resolution.x / u_resolution.y;

        // Interaction distortion from cursor
        float distToMouse = length(st - mouse);
        float mouseInfluence = smoothstep(0.4, 0.0, distToMouse) * 0.35;

        float t = u_time * 0.18;

        // Domain warping coordinates
        vec2 q = vec2(
          fbm(st + vec2(0.0, t * 0.5) + mouseInfluence),
          fbm(st + vec2(t * 0.3, 1.0) - mouseInfluence)
        );

        vec2 r = vec2(
          fbm(st + 2.5 * q + vec2(1.7, 9.2) + 0.15 * t),
          fbm(st + 2.5 * q + vec2(8.3, 2.8) + 0.12 * t)
        );

        float f = fbm(st + 3.0 * r);

        // Core Brand Colors:
        // Jet Black #0B0B0B: vec3(0.043, 0.043, 0.043)
        // Hot Pink #FF2DAB:  vec3(1.0, 0.176, 0.670)
        // Acid Lime #D4FF3F: vec3(0.831, 1.0, 0.247)
        // Deep Charcoal #141414: vec3(0.078, 0.078, 0.078)
        vec3 colorBg = vec3(0.043, 0.043, 0.043);
        vec3 colorPink = vec3(1.0, 0.176, 0.670);
        vec3 colorLime = vec3(0.831, 1.0, 0.247);
        vec3 colorSurface = vec3(0.078, 0.078, 0.078);

        // Blend ribbon contours
        float ribbonPink = smoothstep(0.15, 0.65, f + q.x * 0.5);
        float ribbonLime = smoothstep(0.35, 0.85, f + r.y * 0.6 + mouseInfluence * 0.5);

        vec3 col = mix(colorBg, colorSurface, clamp(length(q), 0.0, 1.0));
        col = mix(col, colorPink, ribbonPink * 0.55);
        col = mix(col, colorLime, ribbonLime * 0.45);

        // Fine highlights on ribbon edges
        float edgePink = 1.0 - smoothstep(0.0, 0.04, abs(f - 0.42));
        float edgeLime = 1.0 - smoothstep(0.0, 0.03, abs(f - 0.58));
        col += colorPink * edgePink * 0.4;
        col += colorLime * edgeLime * 0.5;

        // Subtle vignette around edges
        vec2 uvCenter = v_uv - 0.5;
        float vignette = clamp(1.0 - dot(uvCenter, uvCenter) * 1.2, 0.0, 1.0);
        col *= mix(0.4, 1.0, vignette);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    // Compile helper
    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry covering -1 to 1
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uTime = gl.getUniformLocation(program, 'u_time');

    let mouseX = window.innerWidth * 0.5;
    let mouseY = window.innerHeight * 0.5;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = canvas.height - e.clientY; // Invert for WebGL coord system
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      const height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();

    let animationFrameId;
    let startTime = performance.now();

    const render = () => {
      // Smooth lerp for mouse motion
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const currentTime = (performance.now() - startTime) * 0.001;

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseX * (canvas.width / window.innerWidth), mouseY * (canvas.height / window.innerHeight));
      gl.uniform1f(uTime, currentTime);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
      style={{ background: '#0B0B0B' }}
    />
  );
}

