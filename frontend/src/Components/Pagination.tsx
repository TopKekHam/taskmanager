export default function Pagination({
  pageCount,
  onPageSelected,
} : {
  pageCount: number;
  onPageSelected: (num: number) => void;
}) {

	const pages = [];

	for (let i = 0; i < pageCount; i++) {
		pages.push(i);
	}

	return <div className="row">
		{pages.map(num => 
			<button key={num} onClick={() => onPageSelected(num)}>{num + 1}</button>
		)}
	</div>

}
