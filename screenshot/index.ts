interface Window {
  __TAURI__: {
    tauri: {
      invoke(cmd: string, arg?: {}): Promise<unknown>
    }
    event: {
      emit(event: string, payload?: unknown): Promise<void>
      once(event: string, handler: (event) => {}): Promise<void>
    }
    window: {
      PhysicalPosition: new (x: number, y: number) => any
      PhysicalSize: new (width: number, height: number) => any
      appWindow: {
        setPosition(pos: Window['__TAURI__']['window']['PhysicalPosition']): Promise<void>
        setSize(size: Window['__TAURI__']['window']['PhysicalSize']): Promise<void>
        show(): Promise<void>
        setFocus(): Promise<void>
        close(): Promise<void>
        hide(): Promise<void>
      }
    }
  }
}

let background = "data:image/png;base64,"

let canvas: HTMLCanvasElement | undefined = undefined;
let ctx: CanvasRenderingContext2D | null = null;

let scaleFactor = 1

const random = (min: any, max: any) => Math.floor(Math.random() * (max - min + 1) + min)

window.__TAURI__.tauri.invoke("screenshot").then(async res => {
  const [buffer, x, y, width, height, scale] = res as [Uint8Array, number, number, number, number, number]
  // console.log([buffer, x, y, width, height, scale], window.__TAURI__.window)
  await window.__TAURI__.window.appWindow.setPosition(new window.__TAURI__.window.PhysicalPosition(x, y))
  await window.__TAURI__.window.appWindow.setSize(new window.__TAURI__.window.PhysicalSize(width, height))
  await window.__TAURI__.window.appWindow.show()
  await window.__TAURI__.window.appWindow.setFocus()

  scaleFactor = scale
  background = "data:image/png;base64," + arrayBufferToBase64(buffer);

  const div = document.getElementById("div") as HTMLDivElement
  div.style.backgroundImage = "url(" + background + ")"
})

window.onload = () => {
  canvas = document.getElementById("canvas") as HTMLCanvasElement
  canvas.width = screen.width
  canvas.height = screen.height
  ctx = canvas?.getContext("2d")!

  ctx.beginPath();
  ctx.rect(0, 0, canvas!.width, canvas!.height);
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fill();
  ctx.closePath();

  canvas.addEventListener('keyup', async (event) => {
    if (event.code === 'Escape') {
      await window.__TAURI__.window.appWindow.close();
    }
  })
  canvas.addEventListener('mouseup', async (event) => {
    if (event.button === 0) {
      mouseup(event)
    } else if (event.button === 2) {
      await window.__TAURI__.window.appWindow.close();
    }
  })
  canvas.addEventListener('mousedown', async (event) => {
    if (event.button === 0) {
      mousedown(event)
    }
  })
  canvas.addEventListener('mousemove', async (event) => {
    if (event.button === 0) {
      mousemove(event)
    }
  })
}

let start = false
let startPoint = { x: 0, y: 0 }

function mousedown(event: MouseEvent) {
  start = true;
  startPoint = { x: event.pageX, y: event.pageY }
  // console.log("MouseEvent Down: ", event, canvas!.width, canvas!.height)
}

function mousemove(event: MouseEvent) {
  if (!start) {
    return
  }

  let x = Math.min(event.pageX, startPoint.x);
  let y = Math.min(event.pageY, startPoint.y);
  let width = Math.abs(event.pageX - startPoint.x)
  let height = Math.abs(event.pageY - startPoint.y)

  ctx!.beginPath();
  ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
  ctx!.fill();
  ctx!.closePath();

  ctx!.beginPath();
  ctx!.rect(0, 0, canvas!.width, canvas!.height);
  ctx!.fillStyle = 'rgba(0,0,0,0.4)';
  ctx!.fill();
  ctx!.closePath();

  ctx!.beginPath();
  ctx!.clearRect(x, y, width, height)
  ctx!.fill();
  ctx!.closePath();
}

async function mouseup(event: MouseEvent) {
  start = false;
  // console.log("MouseEvent Up: ", event, ctx)
  await window.__TAURI__.window.appWindow.hide()

  let x = Math.min(event.pageX, startPoint.x) * scaleFactor
  let y = Math.min(event.pageY, startPoint.y) * scaleFactor
  let width = Math.abs(event.pageX - startPoint.x) * scaleFactor
  let height = Math.abs(event.pageY - startPoint.y) * scaleFactor

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height
  let img = new Image();
  img.src = background;
  img.onload = async () => {
    context!.drawImage(img, x, y, width, height, 0, 0, width, height);
    let imageData = canvas!.toDataURL('image/png');
    await window.__TAURI__.tauri.invoke('show_main_window', { url: '/window/result?target=ocr&rand=' + random(1, 10000000) });
    await window.__TAURI__.event.once('result-page-mounted-event', async (event) => {
      await window.__TAURI__.event.emit('wait-ocr-image-data-event', { imageData })
      await window.__TAURI__.window.appWindow.close()
    })
  };
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
