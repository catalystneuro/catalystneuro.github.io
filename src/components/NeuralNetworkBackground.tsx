import { useEffect, useRef } from "react";

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  connections: number[];
}

interface Pulse {
  fromNeuron: number;
  toNeuron: number;
  progress: number;
  speed: number;
}

export const NeuralNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const neuronsRef = useRef<Neuron[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        initializeNeurons();
      }
    };

    const initializeNeurons = () => {
      const neuronCount = Math.min(35, Math.floor((canvas.width * canvas.height) / 30000));
      const neurons: Neuron[] = [];
      
      for (let i = 0; i < neuronCount; i++) {
        neurons.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 3 + 2,
          pulsePhase: Math.random() * Math.PI * 2,
          connections: [],
        });
      }
      
      // Pre-calculate connections for each neuron
      const connectionDistance = 180;
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const dx = neurons[i].x - neurons[j].x;
          const dy = neurons[i].y - neurons[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectionDistance) {
            neurons[i].connections.push(j);
            neurons[j].connections.push(i);
          }
        }
      }
      
      neuronsRef.current = neurons;
      pulsesRef.current = [];
      lastTimeRef.current = 0;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation loop
    const animate = (timestamp: number) => {
      if (!canvas || !ctx) return;

      // Calculate delta time and cap it to prevent large jumps when tab is backgrounded
      const deltaTime = lastTimeRef.current ? timestamp - lastTimeRef.current : 16.67;
      const cappedDelta = Math.min(deltaTime, 50); // Cap at 50ms to prevent speedup
      lastTimeRef.current = timestamp;

      // Normalize to 60fps (16.67ms per frame)
      const timeScale = cappedDelta / 16.67;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const neurons = neuronsRef.current;
      const pulses = pulsesRef.current;
      const connectionDistance = 180;

      // Update neurons
      neurons.forEach((neuron) => {
        neuron.x += neuron.vx * timeScale;
        neuron.y += neuron.vy * timeScale;
        neuron.pulsePhase += 0.02 * timeScale;

        // Bounce off edges
        if (neuron.x < 0 || neuron.x > canvas.width) neuron.vx *= -1;
        if (neuron.y < 0 || neuron.y > canvas.height) neuron.vy *= -1;

        // Keep within bounds
        neuron.x = Math.max(0, Math.min(canvas.width, neuron.x));
        neuron.y = Math.max(0, Math.min(canvas.height, neuron.y));
      });

      // Draw axon/dendrite connections (curved lines)
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const dx = neurons[i].x - neurons[j].x;
          const dy = neurons[i].y - neurons[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.12;
            
            // Draw curved axon-like connection
            ctx.beginPath();
            ctx.strokeStyle = `rgba(20, 102, 167, ${opacity})`;
            ctx.lineWidth = 1;
            
            // Add slight curve to make it look more organic
            const midX = (neurons[i].x + neurons[j].x) / 2;
            const midY = (neurons[i].y + neurons[j].y) / 2;
            const perpX = -(neurons[j].y - neurons[i].y) * 0.1;
            const perpY = (neurons[j].x - neurons[i].x) * 0.1;
            
            ctx.moveTo(neurons[i].x, neurons[i].y);
            ctx.quadraticCurveTo(midX + perpX, midY + perpY, neurons[j].x, neurons[j].y);
            ctx.stroke();
            
            // Draw small synaptic terminals along the connection
            const terminalCount = Math.floor(distance / 60);
            for (let t = 1; t < terminalCount; t++) {
              const tRatio = t / terminalCount;
              const tx = neurons[i].x + (neurons[j].x - neurons[i].x) * tRatio + perpX * (1 - Math.abs(tRatio - 0.5) * 2);
              const ty = neurons[i].y + (neurons[j].y - neurons[i].y) * tRatio + perpY * (1 - Math.abs(tRatio - 0.5) * 2);
              ctx.beginPath();
              ctx.arc(tx, ty, 1, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(20, 102, 167, ${opacity * 0.5})`;
              ctx.fill();
            }
          }
        }
      }

      // Randomly create new pulses (neural firing)
      if (Math.random() < 0.03 && neurons.length > 1) {
        const fromNeuron = Math.floor(Math.random() * neurons.length);
        if (neurons[fromNeuron].connections.length > 0) {
          const toIndex = Math.floor(Math.random() * neurons[fromNeuron].connections.length);
          const toNeuron = neurons[fromNeuron].connections[toIndex];
          pulses.push({
            fromNeuron,
            toNeuron,
            progress: 0,
            speed: 0.02 + Math.random() * 0.02,
          });
        }
      }

      // Update and draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed * timeScale;
        
        if (pulse.progress >= 1) {
          // Pulse reached destination - maybe trigger cascading pulse
          if (Math.random() < 0.3) {
            const destNeuron = neurons[pulse.toNeuron];
            if (destNeuron.connections.length > 0) {
              const nextTarget = destNeuron.connections[Math.floor(Math.random() * destNeuron.connections.length)];
              if (nextTarget !== pulse.fromNeuron) {
                pulses.push({
                  fromNeuron: pulse.toNeuron,
                  toNeuron: nextTarget,
                  progress: 0,
                  speed: 0.02 + Math.random() * 0.02,
                });
              }
            }
          }
          pulses.splice(i, 1);
          continue;
        }

        // Draw pulse
        const from = neurons[pulse.fromNeuron];
        const to = neurons[pulse.toNeuron];
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const perpX = -dy * 0.1;
        const perpY = dx * 0.1;
        
        // Calculate position along curved path
        const t = pulse.progress;
        const mt = 1 - t;
        const px = mt * mt * from.x + 2 * mt * t * ((from.x + to.x) / 2 + perpX) + t * t * to.x;
        const py = mt * mt * from.y + 2 * mt * t * ((from.y + to.y) / 2 + perpY) + t * t * to.y;
        
        // Draw pulse glow
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, 8);
        gradient.addColorStop(0, "rgba(20, 102, 167, 0.6)");
        gradient.addColorStop(0.5, "rgba(20, 102, 167, 0.2)");
        gradient.addColorStop(1, "rgba(20, 102, 167, 0)");
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw pulse core
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(20, 102, 167, 0.8)";
        ctx.fill();
      }

      // Draw neuron cell bodies
      neurons.forEach((neuron, index) => {
        // Soma (cell body) with pulsing effect
        const pulseIntensity = 0.3 + Math.sin(neuron.pulsePhase) * 0.1;
        
        // Outer glow (dendrite region)
        const gradient = ctx.createRadialGradient(
          neuron.x, neuron.y, 0,
          neuron.x, neuron.y, neuron.radius * 3
        );
        gradient.addColorStop(0, `rgba(20, 102, 167, ${pulseIntensity})`);
        gradient.addColorStop(0.4, `rgba(20, 102, 167, ${pulseIntensity * 0.3})`);
        gradient.addColorStop(1, "rgba(20, 102, 167, 0)");
        
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, neuron.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Inner soma
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20, 102, 167, ${pulseIntensity + 0.1})`;
        ctx.fill();
        
        // Nucleus highlight
        ctx.beginPath();
        ctx.arc(neuron.x - neuron.radius * 0.2, neuron.y - neuron.radius * 0.2, neuron.radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${pulseIntensity * 0.3})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};
