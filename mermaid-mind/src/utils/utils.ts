import { toBase64 } from "js-base64";
import { saveAs } from "file-saver";

export const formatJSON = (data: unknown): string => {
  return JSON.stringify(data, undefined, 2);
};

export const svgToExport = async (
  isSvg: boolean,
  contentType?: string,
  dataType: "base64" | "blob" = "base64",
): Promise<string | Blob> => {
  return new Promise((resolve, reject) => {
    const svg = document.querySelector("#container svg");
    if (!svg) {
      return reject(new Error("SVG element not found"));
    }

    const box = svg.getBoundingClientRect();
    const canvas = document.createElement("canvas");
    canvas.width = box.width;
    canvas.height = box.height;

    const context = canvas.getContext("2d");
    if (!context) {
      return reject(new Error("Canvas context could not be created"));
    }

    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const svgUrl = getBase64Svg(svg, canvas.width, canvas.height);
    if (isSvg) {
      resolve(svgUrl);
    } else {
      const image = new Image();
      image.addEventListener("load", () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        if (dataType === "base64") {
          const url = canvas.toDataURL(contentType);
          resolve(url);
        } else {
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Blob creation failed"));
            }
          }, contentType);
        }
      });
      image.src = svgUrl;
    }
  });
};

export const getBase64Svg = (
  svg: Element,
  width?: number,
  height?: number,
): string => {
  if (height) svg.setAttribute("height", `${height}px`);
  if (width) svg.setAttribute("width", `${width}px`);

  const svgString = svg.outerHTML
    .replaceAll("<br>", "<br/>")
    .replaceAll(/<img([^>]*)>/g, (_, g: string) => `<img ${g} />`);

  return `data:image/svg+xml;base64,${toBase64(svgString)}`;
};

export const downloadImgAsPng = async (): Promise<void> => {
  try {
    const pngUrl = await svgToExport(false);
    saveAs(pngUrl, "mermaid-diagram.png");
  } catch (error) {
    console.error("Failed to download PNG:", error);
  }
};

export const downloadImgAsSvg = async (): Promise<void> => {
  try {
    const svgUrl = await svgToExport(true);
    saveAs(svgUrl, "mermaid-diagram.svg");
  } catch (error) {
    console.error("Failed to download SVG:", error);
  }
};

export const downloadJson = (json: string): void => {
  const jsonUrl = `data:application/json;base64,${toBase64(json)}`;
  saveAs(jsonUrl, "mermaid-diagram.json");
};

export const importJson = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";

    fileInput.addEventListener("change", (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target) {
            const result = event.target.result;
            resolve(result as string);
          }
        };
        reader.onerror = () => {
          reject(new Error("File reading failed"));
        };
        reader.readAsText(file);
        fileInput.remove();
      } else {
        reject(new Error("No file selected"));
      }
    });

    fileInput.click();
  });
};

export const calculateTimeDifference = (createdDate: string) => {
  const [day, month, year] = createdDate.split("/").map(Number);

  if (day && month && year) {
    const created = new Date(year, month - 1, day);
    const now = new Date();

    const differenceInMillis = now.getTime() - created.getTime();
    const differenceInDays = Math.floor(
      differenceInMillis / (1000 * 60 * 60 * 24),
    );

    if (differenceInDays === 0) {
      return "created today";
    } else if (differenceInDays < 30) {
      return `created ${differenceInDays} days ago`;
    } else if (differenceInDays < 365) {
      const months = Math.floor(differenceInDays / 30);
      return `created ${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.floor(differenceInDays / 365);
      return `created ${years} ${years === 1 ? "year" : "years"} ago`;
    }
  }
};
