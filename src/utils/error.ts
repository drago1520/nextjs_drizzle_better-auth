/**
 * @description Use in catch() block
 * @param e error from catch()
 */
export function errorLogger(e: unknown, consoleErrorMsg: unknown = e, withToast = false): { error: string; success: false } {
  console.error(consoleErrorMsg);
  if (typeof window === 'undefined') {
    withToast = false;
    console.error('Tried to run a toast in server enviroment');
  }
  if (e instanceof Error) {
    //TODO toast
    // if(withToast)
    return { error: e.message, success: false };
  }
  if (typeof e === 'string') {
    return { error: e, success: false };
  }
  return { error: `Strange error: ${e}`, success: false };
}

export type ErrorLogger = ReturnType<typeof errorLogger>;
