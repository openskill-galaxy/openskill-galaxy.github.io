export default function ErrorNotice({ message }: { message: string }) {
  return (
    <div className="card max-w-md p-8 space-y-4 mx-auto text-center">
      <h2 className="text-base font-semibold text-body">数据加载失败</h2>
      <p className="text-sm text-rose-600 dark:text-rose-300 leading-relaxed break-all">{message}</p>
      <button type="button" onClick={() => window.location.reload()} className="btn-ghost w-full">
        重试
      </button>
    </div>
  );
}
