import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';

export default function ShapeBg() {
  return (
    <div className="shape_bg">
      <div>
        <div className="bg_flower">
          <Image
            src={LocalImages.ImageGatewayFlower}
            alt="ImageGatewayFlower"
            width={273}
            height={578}
          />
        </div>
        <div className="bg_round">
          <Image
            src={LocalImages.ImageGatewayRound}
            alt="ImageGatewayRound"
            width={578}
            height={578}
          />
        </div>
      </div>
      <div>
        <div className="bg_hexagon">
          <Image
            src={LocalImages.ImageGatewayHexagon}
            alt="ImageGatewayHexagon"
            width={352}
            height={455}
          />
        </div>
        <div className="bg_octagon">
          <Image
            src={LocalImages.ImageGatewayOctagon}
            alt="ImageGatewayOctagon"
            width={521}
            height={521}
          />
        </div>
      </div>
    </div>
  );
}
