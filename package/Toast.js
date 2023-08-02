const DEFAULT_OPTIONS = {
  autoClose: 5000,
  position: "top-right",
  onClose: () => {},
  canClose: true,
  isProgress: true,
};

export default class Toast {
  #toastElem;
  #autoCloseTimeOut;
  #progressInterval;
  #removeBinded;
  #visibleSince;
  #autoClose;
  #paused = false;

  constructor(options) {
    this.#toastElem = document.createElement("div");
    this.#toastElem.classList.add("toast");

    requestAnimationFrame(() => {
      this.#toastElem.classList.add("show");
    });
    this.#removeBinded = this.remove.bind(this);
    this.#unpause = () => this.#pause = false;
    this.#pause = () => this.#pause = true;
    this.update({ ...DEFAULT_OPTIONS, ...options });
  }

  set autoClose(value) {
    this.#autoClose = value;
    this.#visibleSince = new Date();

    if (value === false) return;
    if (this.#autoCloseTimeOut != null) clearTimeout(this.#autoCloseTimeOut);

    this.#autoCloseTimeOut = setTimeout(() => {
      this.remove();
    }, value);
  }

  set position(value) {
    const currentContainer = this.#toastElem.parentElement;
    const selector = `.toast-container[data-position=${value}]`;
    const container =
      document.querySelector(selector) || createContainer(value);
    container.appendChild(this.#toastElem);
    if (currentContainer == null || currentContainer.hasChildNodes()) return;
    currentContainer.remove();
  }

  set text(value) {
    this.#toastElem.textContent = value;
  }

  update(options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  set canClose(value) {
    this.#toastElem.classList.toggle("can-close", value);
    if (value) {
      this.#toastElem.addEventListener("click", this.#removeBinded);
    } else {
      this.#toastElem.removeEventListener("click", this.#removeBinded);
    }
  }

  set isProgress(value) {
    this.#toastElem.classList.toggle("progress", value);
    this.#toastElem.style.setProperty("--progress", 1);

    if (value) {
      this.#progressInterval = setInterval(() => {
        const timeVisible = new Date() - this.#visibleSince;
        const remainingTime = this.#autoClose - timeVisible;
        this.#toastElem.style.setProperty(
          "--progress",
          remainingTime / this.#autoClose
        );
      }, 10);
    }
  }

  set pauseOnHover(value) {
    if (value) {
      this.#toastElem.addEventListener("mouseover", this.#unpause);
      this.#toastElem.addEventListener("mouseleave", this.#pause);
    } else {
      this.#toastElem.removeEventListener("mouseover", this.#unpause);
      this.#toastElem.removeEventListener("mouseleave", this.#pause);
    }
  }

  remove() {
    clearTimeout(this.#autoCloseTimeOut);
    clearInterval(this.#progressInterval);
    const container = this.#toastElem.parentElement;
    this.#toastElem.classList.remove("show");
    this.#toastElem.addEventListener("transitionend", () => {
      this.#toastElem.remove();
      if (container.hasChildNodes()) return;
      container.remove();
    });
    this.onClose();
  }
}

function createContainer(position) {
  const container = document.createElement("div");
  container.classList.add("toast-container");
  container.setAttribute("data-position", position);
  document.body.appendChild(container);
  return container;
}
