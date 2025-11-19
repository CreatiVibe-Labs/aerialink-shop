import React from "react";
import Image from "next/image";

const InstallationDiagram = () => (
	<div className="flex justify-center my-6">
		<Image
			src="/installation-chart.png"
			alt="Installation clearance diagram"
			width={500}
			height={500}
			className="w-[400px] rounded-md h-[300px]"
			priority
		/>
	</div>
);

const Page = () => {
	return (
		<div className="max-w-7xl mx-auto  my-5">
			<h1 className="text-[40px] font-bold text-[#666664] mb-8">Installation Guide</h1>

			<section className="mb-10">
				<h2 className="text-3xl font-semibold mb-4 text-[#666664]">What you need to know before purchase</h2>
				<ul className="list-disc pl-6 space-y-2 text-[#666664] text-[20px]">
					<li>Carpets are heavy and long. Be sure to check the delivery route to your room.</li>
					<li>The lightest one weighs about 15kg, the heaviest one weighs 30kg, and the package length is 180cm at the shortest and 260cm at the longest.</li>
					<li>If the wood carpet is even 1mm larger, it cannot be laid in your room. Be sure to measure your room accurately. For flooring carpets, choose a size that is about 1cm smaller than the size of your room. For example, if you are buying a 260X175cm carpet, you will need a room that is at least 261X176cm.</li>
				</ul>
			</section>

			<section className="mb-10">
				<InstallationDiagram />
				<h2 className="text-3xl font-semibold mb-4 text-[#666664]">About Installation of Carpets</h2>
                <ul className="list-disc pl-6 space-y-2 text-[#666664] text-[20px]">
					<li>Installation should be done by at least two adults.</li>
					<li>Always wear gloves and long sleeves. Hands or wrists may get caught in the gaps between the boards and cause injury.</li>
					<li>When laying on tatami or carpet, use anti-mold and anti-mite sheets.</li>
					<li>If laying on a dented tatami mat, fill it with cardboard to flatten it before laying.</li>
					<li>Carpet can be cut along the board grain with a utility knife.</li>
					<li>When cutting to fit unevenness such as pillars, use a fine saw for plywood and smooth the cut surface with sandpaper.</li>
					<li>If the end of the laying is short, the board grain may be bent. Pull it out to the end.</li>
				</ul>
			</section>

			<section className="mb-10">
				<h2 className="text-3xl font-semibold mb-4 text-[#666664]">Precautions for Using Carpet</h2>
				<ul className="list-disc pl-6 space-y-2 text-[#666664] text-[20px]">
					<li>When laying on extremely soft tatami or carpet, placing heavy furniture on it may cause cracks, warping, or dents.</li>
					<li>If possible, ventilate the room regularly to prevent moisture and extend the life of the carpet.</li>
					<li>Leaving liquid on the carpet for a long period of time can cause stains, warping, and cracks.</li>
					<li>If you place furniture that is frequently moved across the carpet (such as a chair with wheels), placing a scratch-prevention mat on top of the carpet can help prevent the paint from peeling.</li>
				</ul>
			</section>
		</div>
	);
};

export default Page;

