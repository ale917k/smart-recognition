import { useRef, useEffect } from "react";

/**
 * Creates DOM element to be used as React root.
 * @returns {HTMLElement}
 */
const createRootElement = (id) => {
  const rootContainer = document.createElement("div");
  rootContainer.setAttribute("id", id);
  return rootContainer;
};

/**
 * Appends element as last child of body.
 * @param {HTMLElement} rootElem
 */
const addRootElement = (rootElem) => {
  document.body.insertBefore(
    rootElem,
    document.body.lastElementChild.nextElementSibling
  );
};

/**
 * Hook to create a React Portal.
 * Automatically handles creating and tearing-down the root elements (no SRR
 * makes this trivial), so there is no need to ensure the parent target already
 * exists.
 * @example
 * const target = usePortal(id, [id]);
 * return createPortal(children, target);
 * @param {String} id The id of the target container, e.g 'modal' or 'spotlight'
 * @returns {HTMLElement} The DOM node to use as the Portal target.
 */
const usePortal = (id) => {
  const rootElemRef = useRef(null);

  useEffect(() => {
    // Look for existing target dom element to append to
    const existingParent = document.querySelector(`#${id}`);
    // Parent is either a new root or the existing dom element
    const parentElem = existingParent || createRootElement(id);

    // If there is no existing DOM element, add a new one.
    if (!existingParent) {
      addRootElement(parentElem);
    }

    // Add the detached element to the parent
    parentElem.appendChild(rootElemRef.current);

    // Cleanup function
    return () => {
      rootElemRef.current.remove();
      if (parentElem.childNodes.length === 0) {
        parentElem.remove();
      }
    };
  }, [id]);

  // Lazy Initialization
  const getRootElem = () => {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement("div");
    }
    return rootElemRef.current;
  };

  return getRootElem();
};

export default usePortal;
