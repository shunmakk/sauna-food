import React from "react";

interface PageNationProps {
  filterContent: unknown[]; // 型が定義されていないため、unknownを使用(後々修正)
  PerPage: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const PageNation: React.FC<PageNationProps> = ({
  filterContent,
  PerPage,
  paginate,
  currentPage,
}) => {
  return (
    <>
      <div className="flex justify-center mt-12">
        {Array.from(
          {
            length: Math.ceil(filterContent.length / PerPage),
          },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-2 ml-2 rounded-lg ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default PageNation;
