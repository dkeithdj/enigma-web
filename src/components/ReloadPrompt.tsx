import { useRegisterSW } from "virtual:pwa-register/react";

function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // eslint-disable-next-line prefer-template
      console.log("SW Registered: " + r);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className="">
      {(offlineReady || needRefresh) && (
        <div className="fixed bottom-0 right-0 m-16 p-12 border border-gray-500 rounded-lg z-10 text-left shadow-md bg-white">
          <div className="mb-2">
            {offlineReady ? (
              <span>App ready to work offline</span>
            ) : (
              <span>
                New content available, click on reload button to update.
              </span>
            )}
          </div>
          {needRefresh && (
            <button
              className="border border-gray-500 rounded-md px-3 py-1 outline-none mr-5"
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </button>
          )}
          <button
            className="border border-gray-500 rounded-md px-3 py-1 outline-none mr-5"
            onClick={() => close()}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default ReloadPrompt;
