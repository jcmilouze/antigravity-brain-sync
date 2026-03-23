import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

interface ReferenceChartProps {
  lmTps: number | null
  modelName: string
}

const ReferenceChart = ({ lmTps, modelName }: ReferenceChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  const references = [
    { label: 'Gemini 1.5 Pro', tps: 120, color: 'rgba(56, 189, 248, 0.4)' },
    { label: 'Claude 3.5 Sonnet', tps: 95, color: 'rgba(56, 189, 248, 0.4)' },
    { label: 'GPT-4o', tps: 110, color: 'rgba(56, 189, 248, 0.4)' },
    { label: 'GPT-3.5 Turbo', tps: 150, color: 'rgba(56, 189, 248, 0.4)' }
  ]

  useEffect(() => {
    if (!chartRef.current) return

    const sortedData = [...references]
    if (lmTps !== null) {
      sortedData.push({ 
        label: modelName.length > 20 ? 'LM Studio (Local)' : modelName, 
        tps: lmTps, 
        color: 'rgba(129, 140, 248, 1)' 
      })
    }

    sortedData.sort((a, b) => b.tps - a.tps)

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sortedData.map(d => d.label),
        datasets: [{
          data: sortedData.map(d => d.tps),
          backgroundColor: sortedData.map(d => d.color),
          borderRadius: 8,
          borderWidth: 0,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e293b',
            titleColor: '#f8fafc',
            bodyColor: '#f8fafc',
            padding: 12,
            cornerRadius: 12,
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.x.toFixed(1)} tokens/sec`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#94a3b8' }
          },
          y: {
            grid: { display: false },
            ticks: { color: '#f1f5f9', font: { weight: 'bold' } }
          }
        }
      }
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [lmTps, modelName])

  return (
    <div className="h-[400px] w-full">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

export default ReferenceChart
