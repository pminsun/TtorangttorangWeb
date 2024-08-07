import SaveAnnounce from '@/components/SaveAnnounce';
import ShapeBg from '@/components/ShapeBg';
import { useUserStore } from '@/store/store';

export default function Announce() {
  const { userAccessToken } = useUserStore();
  return (
    <div className="slider-container">
      <ShapeBg />
      <SaveAnnounce userAccessToken={userAccessToken} />
    </div>
  );
}
