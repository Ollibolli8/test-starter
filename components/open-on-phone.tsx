import { QrTile } from "@/components/qr-code";
import { APP } from "@/lib/app";

/**
 * The live link and its QR code, so a reviewer opens the app on their own phone: small in a corner beside the app
 * at / (in the app's language). Nothing until APP.liveUrl is set.
 */
export function OpenOnPhone({ title, large = false }: { title: string; large?: boolean }) {
  if (!APP.liveUrl) return null;
  return (
    <div className={large ? "flex flex-col items-start gap-4" : "flex items-center gap-4"}>
      <QrTile className={large ? "size-32 xl:size-40" : "size-16"} label={`QR code: ${APP.liveUrl}`} />
      <p className="flex flex-col gap-0.5 text-[14px]">
        <span className="font-medium">{title}</span>
        <a href={APP.liveUrl} className="text-muted underline-offset-4 hover:underline">
          {APP.liveUrl.replace("https://", "")}
        </a>
      </p>
    </div>
  );
}
