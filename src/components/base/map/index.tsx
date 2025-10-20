'use client';

import { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style';
import Overlay from 'ol/Overlay';
import clsxm from '@/utils/clsxm';
import { defaults as defaultInteractions } from 'ol/interaction';
import { defaults as defaultControls } from 'ol/control';

interface OpenLayersMapProps {
  initialLng?: number;
  initialLat?: number;
  popupText?: string;
  locked?: boolean;
  className?: string;
  onChange?: (lat: number, lng: number) => void;
}

export default function OpenLayersMap({
  initialLng = 51.376804,
  initialLat = 35.7025,
  popupText = 'با کلیک روی نقشه می‌توانید مکان را انتخاب کنید',
  locked = false,
  className,
  onChange,
}: OpenLayersMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);
  const [markerFeature, setMarkerFeature] = useState<Feature<Point> | null>(
    null
  );

  // تابع کمکی برای به‌روزرسانی popup
  const updatePopup = (lng: number, lat: number) => {
    if (!popupRef.current) return;

    popupRef.current.innerHTML = popupText;

    // تنظیم موقعیت دستی container
    const container = popupRef.current.parentElement;
    if (container) {
      container.style.left = '0px';
      container.style.top = '-5px';
    }

    const popupOverlay = mapInstance.current
      ?.getOverlays()
      .getArray()[0] as Overlay;

    popupOverlay?.setPosition(fromLonLat([lng, lat]));
  };

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || !popupRef.current) return;

    const marker = new Feature({
      geometry: new Point(fromLonLat([initialLng, initialLat])),
    });

    marker.setStyle(
      new Style({
        image: new Icon({
          src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          scale: 0.05,
        }),
      })
    );

    setMarkerFeature(marker);

    const vectorLayer = new VectorLayer({
      source: new VectorSource({ features: [marker] }),
    });

    const popup = new Overlay({
      element: popupRef.current,
      positioning: 'bottom-center',
      offset: [0, -10],
      stopEvent: false,
    });

    const initialZoom = locked ? 17 : 15;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.png?key=GEhpCE3m4f83D4JzEWW3',
          }),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([initialLng, initialLat]),
        zoom: initialZoom,
      }),
      overlays: [popup],
      interactions: locked
        ? defaultInteractions({ dragPan: false, mouseWheelZoom: false, doubleClickZoom: false })
        : defaultInteractions(),
      controls: locked
        ? defaultControls({ zoom: false, attribution: false, rotate: false })
        : defaultControls(),
    });

    mapInstance.current = map;

    // نمایش popup هنگام load صفحه
    updatePopup(initialLng, initialLat);

    if (!locked) {
      map.on('click', (evt) => {
        const [clickLng, clickLat] = toLonLat(evt.coordinate);
        marker.setGeometry(new Point(fromLonLat([clickLng, clickLat])));
        updatePopup(clickLng, clickLat);

        if (onChange) onChange(clickLat, clickLng);
      });
    }

    return () => map.setTarget(undefined);
  }, []);

  // Update marker and view instantly when locked becomes true
  useEffect(() => {
    if (locked && mapInstance.current && markerFeature) {
      const view = mapInstance.current.getView();
      const coords = fromLonLat([initialLng, initialLat]);

      markerFeature.setGeometry(new Point(coords));
      view.setCenter(coords);
      view.setZoom(17); // zoom locked level

      updatePopup(initialLng, initialLat);
    }
  }, [locked, initialLng, initialLat, popupText, markerFeature]);

  return (
    <div className="relative col-span-2">
      <div
        ref={mapRef}
        className={clsxm('rounded-xl overflow-hidden', className)}
      />
      <div
        ref={popupRef}
        className="px-2 py-1 rounded bg-red-500 text-sm text-white shadow-lg pointer-events-none"
      />
    </div>
  );
}
