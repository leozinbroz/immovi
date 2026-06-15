import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt =
  'Immovi Contabilidade — Especialistas no Ecossistema Imobiliário'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A1D2E',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -160,
            width: 460,
            height: 460,
            borderRadius: '50%',
            background: 'rgba(0,212,170,0.20)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 56, fontWeight: 800, color: '#F8FEFD' }}>
            Immovi
          </span>
          <span style={{ fontSize: 56, fontWeight: 800, color: '#00D4AA' }}>
            .
          </span>
          <span
            style={{
              marginLeft: 18,
              fontSize: 26,
              color: '#7690A5',
              fontWeight: 500,
            }}
          >
            Contabilidade
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: '#F8FEFD',
              lineHeight: 1.1,
              maxWidth: 920,
            }}
          >
            Contabilidade Digital para o Ecossistema Imobiliário
          </span>
          <span
            style={{
              marginTop: 28,
              fontSize: 30,
              color: '#00D4AA',
              fontWeight: 600,
            }}
          >
            Especialistas no Ecossistema Imobiliário
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
