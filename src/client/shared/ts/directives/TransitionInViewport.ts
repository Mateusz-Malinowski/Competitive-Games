type StateClass = `${string}-enter-from` | `${string}-enter-to` | `${string}-enter-active`;

export default {
  element: null as HTMLElement | null,
  animationName: "" as string,
  initialClass: "" as StateClass,
  created(element: HTMLElement, binding: { value: string }): void {
    this.element = element;
    this.animationName = binding.value;
    this.initialClass = `${this.animationName}-enter-from`;

    const newClasses: StateClass[] = [`${this.animationName}-enter-to`, `${this.animationName}-enter-active`];
    const intersectionObserver = new IntersectionObserver((entries, intersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove(this.initialClass);
          entry.target.classList.add(...newClasses);
          intersectionObserver.unobserve(entry.target)
        }
      });
    });
    
    intersectionObserver.observe(element);
  },
  beforeMount(): void {
    const element = this.element as HTMLElement;
    element.classList.add(this.initialClass);
  }
}