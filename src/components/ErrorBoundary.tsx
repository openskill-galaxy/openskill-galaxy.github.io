import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error inside OpenSkill Galaxy:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-page text-body">
          <div className="card max-w-md p-8 space-y-5">
            <span className="text-4xl">⚠️</span>
            <h2 className="text-xl font-semibold tracking-tight text-body">系统运行出现意外中断</h2>
            <p className="text-sm text-muted leading-relaxed">
              加载或解析本地数据时遭遇非预期的异常错误。你可以尝试刷新页面重新载入，或联系社区维护人员协助排查。
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary w-full"
            >
              重新载入页面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
