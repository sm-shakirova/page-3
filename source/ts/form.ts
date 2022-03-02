abstract class Form {
  abstract className: string;
  abstract htmlElement: HTMLFormElement;

  /**
   * приводит форму в неактивное состояние
   */
  disable(): void {
    this.htmlElement.classList.add(`${this.className}--disabled`);
    for (let child of this.htmlElement.children) {
      (child as HTMLSelectElement | HTMLFieldSetElement).disabled = true;
    }
  }

  /**
   * приводит форму в активное состояние
   */
  enable(): void {
    this.htmlElement.classList.remove(`${this.className}--disabled`);
    for (let child of this.htmlElement.children) {
      (child as HTMLSelectElement | HTMLFieldSetElement).disabled = false;
    }

  }

  reset(): void {
    this.htmlElement.reset();
  }
}

export {Form};
