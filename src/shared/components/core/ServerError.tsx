export function ServerError({ message }: { message: string }) {
  const localMessage =
    message.length === 0 ? " A server error occurs!" : message;
  return (
    <div className="bg-red-800 text-white rounded-xl p-3 my-6">
      {localMessage}
    </div>
  );
}
