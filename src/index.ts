interface PreviewerContext {
  type: string;
  fileName: string;
  fileContent: string;
}

class KicadPreviewer {
  private container: HTMLElement | null = null;

  supports(context: PreviewerContext): boolean {
    return context.fileName.endsWith('.kicad_pcb') || 
           context.fileName.endsWith('.kicad_sch');
  }

  async preview(context: PreviewerContext, container: HTMLElement): Promise<void> {
    // Import KiCanvas
    const script = document.createElement('script');
    script.type = 'module';
    script.src = '../node_modules/kicanvas/build/kicanvas.js';
    document.head.appendChild(script);

    // Wait for custom element to be defined
    await customElements.whenDefined('kicanvas-embed');

    // Create the viewer
    const viewer = document.createElement('kicanvas-embed');
    viewer.setAttribute('controls', 'basic');
    viewer.style.width = '100%';
    viewer.style.height = '600px';

    // Create source element for the file
    const source = document.createElement('kicanvas-source');
    source.textContent = context.fileContent;
    viewer.appendChild(source);

    container.appendChild(viewer);
    this.container = container;
  }

  destroy(): void {
    if (this.container) {
      this.container.innerHTML = '';
      this.container = null;
    }
  }
}

// Register the previewer with GitLab
(window as any).registerFilePreviewer(new KicadPreviewer());