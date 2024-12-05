import SearchFlights from '@/sections/SearchFlights'
import FindBestDeal from '@/sections/FindBestDeal';
import FAQs from '@/sections/FAQs';
import FindCheapFlight from '@/sections/FindCheapFlight'
import Footer from '@/sections/Footer'
import Map from '@/sections/Map';

export default function Home() {
  return (
    <div className="container mx-auto">
      <SearchFlights />
      <Map />
      <FindBestDeal />
      <FAQs />
      <FindCheapFlight />
      <Footer />
    </div>
  );
}
