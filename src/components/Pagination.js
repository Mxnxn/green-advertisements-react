import React from "react";

const Pagination = ({ scrollRef, state, setPagination, pagination }) => {
	let pages = [];

	for (let index = 0; index < Math.ceil(state.length / pagination.numberPerPages); index++) {
		pages.push(index + 1);
	}

	return (
		<div className="row pl-3 d-flex w-100">
			<small class="text-danger ">Tap on row to explore</small>
			<ul class="pagination ml-auto bg-none">
				{pages.map((page, index) => (
					<li
						className={page === pagination.currentPage ? "page-item active" : "page-item"}
						onClick={() => {
							console.log(page);
							setPagination((prev) => ({
								...pagination,
								currentPage: page,
								firstIndex: prev.numberPerPages * (page - 1),
								lastIndex: page * prev.numberPerPages,
								rowIndex: prev.numberPerPages * (page - 1) + 1,
							}));
							scrollRef.current.scrollIntoView();
						}}
					>
						<button class="page-link">{page}</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Pagination;
