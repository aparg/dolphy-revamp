"use client";
import { useMap } from "./MapContext";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import MapDrawer from "./MapDrawer";
import useDeviceView from "@/helpers/useDeviceView";
import * as Dialog from "@radix-ui/react-dialog";
import ResaleMap from "./ResaleMap";

const MapContent = ({ listings }) => {
  const { isMapOpen, setIsMapOpen } = useMap();
  const { isMobileView } = useDeviceView();

  return (
    <>
      {/* Desktop Map Button */}
      <div className="hidden sm:block">
        <Button
          variant="default"
          size="icon"
          className="h-10 w-36 rounded-full flex items-center justify-center gap-2"
          onClick={() => setIsMapOpen(!isMapOpen)}
        >
          <span>Map View</span>
          <Map className="h-4 w-4" />
        </Button>
      </div>

      {/* Mobile Map Button */}
      <div className="sm:hidden">
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-[10px] left-1/2 transform -translate-x-1/2 h-10 w-36 rounded-full z-20 bg-white/90 backdrop-blur-sm flex items-center justify-center gap-2"
          onClick={() => setIsMapOpen(!isMapOpen)}
        >
          <span>Map View</span>
          <Map className="h-4 w-4" />
        </Button>
      </div>

      {isMobileView ? (
        <Dialog.Root open={isMapOpen} onOpenChange={setIsMapOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/10" />
            <Dialog.Content className="fixed inset-0 bg-white z-[100] p-0">
              <div className="absolute inset-0">
                <ResaleMap
                  listings={listings}
                  onClose={() => setIsMapOpen(false)}
                />
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ) : (
        <MapDrawer
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          listings={listings}
        />
      )}
    </>
  );
};

export default MapContent;
