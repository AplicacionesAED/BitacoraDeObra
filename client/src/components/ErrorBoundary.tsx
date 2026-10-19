import { Component, type ReactNode } from 'react';

interface State { error: Error | null }

// Evita la pantalla en blanco: ante un error de render muestra un aviso con el detalle
// técnico (útil para reportarlo) y una opción de recargar.
export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
    state: State = { error: null };

    static getDerivedStateFromError(error: Error): State {
        return { error };
    }

    componentDidCatch(error: Error, info: unknown) {
        console.error('[ErrorBoundary]', error, info);
    }

    render() {
        if (!this.state.error) return this.props.children;
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: '#f8fafc' }}>
                <div style={{ maxWidth: 480, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
                    <h1 style={{ fontSize: 18, fontWeight: 800, color: '#1e293b', margin: 0 }}>Algo salió mal en esta pantalla</h1>
                    <p style={{ fontSize: 14, color: '#475569', margin: '12px 0' }}>
                        Recargue la página e intente de nuevo. Si el problema se repite, envíe una captura de este mensaje.
                    </p>
                    <pre style={{ fontSize: 11, color: '#be123c', background: '#fff1f2', borderRadius: 8, padding: 10, textAlign: 'left', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                        {String(this.state.error?.message || this.state.error)}
                    </pre>
                    <button
                        onClick={() => window.location.reload()}
                        style={{ marginTop: 8, padding: '10px 20px', borderRadius: 12, border: 0, background: '#0f172a', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
                    >
                        Recargar
                    </button>
                </div>
            </div>
        );
    }
}
