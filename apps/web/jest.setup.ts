const releaseStdin = () => {
  if (!process.stdin) {
    return;
  }

  const isTty =
    typeof process.stdin.isTTY === 'boolean' ? process.stdin.isTTY : false;

  if (!isTty) {
    if (typeof process.stdin.unref === 'function') {
      process.stdin.unref();
    }

    if (
      typeof process.stdin.destroy === 'function' &&
      !process.stdin.destroyed
    ) {
      try {
        process.stdin.destroy();
      } catch {
        // ignore if already closed
      }
    }
  }
};

const closeResidualPipes = () => {
  const getActiveHandles = (
    process as unknown as { _getActiveHandles?: () => any[] }
  )._getActiveHandles;

  if (typeof getActiveHandles !== 'function') {
    return;
  }

  for (const handle of getActiveHandles()) {
    if (
      !handle ||
      handle === process.stdin ||
      handle === process.stdout ||
      handle === process.stderr
    ) {
      continue;
    }

    if (typeof handle.destroy === 'function' && !handle.destroyed) {
      try {
        handle.destroy();
      } catch {
        // swallow errors from handles that are closed during cleanup
      }
    }
  }
};

releaseStdin();
afterAll(closeResidualPipes);
