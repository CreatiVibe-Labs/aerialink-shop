import LinksShortcuts from "./components/links-shortcut/links-shortcuts";
import OfficeTimingComponent from "./components/office-timing-component";
import SidebarPoints from "./components/sidebar-points";
import SidebarPoster from "./components/sidebar-poster";

const HomeLeftSection = () => {
  
  return (
    <div className="bg-[#EBECF0] rounded-xl max-w-[280px] p-2 space-y-3 max-xl:col-span-2 max-sm: col-span-1 max-xl:max-w-full max-md:mt-2">
      {/* iframe youtube video */}
      <iframe
        className="aspect-video rounded-xl"
        src="https://www.youtube.com/embed/UV0mhY2Dxr0?si=5WU1KEIaRCILY_RV"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      {/* posters */}
     <SidebarPoster/>
     <LinksShortcuts/>
     <OfficeTimingComponent/>
     <SidebarPoints/>
    </div>
  );
};

export default HomeLeftSection;
