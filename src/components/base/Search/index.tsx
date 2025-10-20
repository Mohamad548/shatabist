import { useState, useEffect } from "react";

interface SearchComponentProps {
  data: string[];
  action?: () => void;
}

const SearchComponent = ({ data, action }: SearchComponentProps) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // بارگذاری تاریخچه جستجو از localStorage هنگام بارگذاری صفحه
  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  // ذخیره تاریخچه جستجو در localStorage
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setFilteredData([]);
    } else {
      setFilteredData(
        data.filter((item) => item.toLowerCase().includes(value.toLowerCase())),
      );
    }
  };

  const handleSelect = (item: string) => {
    setSearchHistory((prev) => {
      const updatedHistory = [
        item,
        ...prev.filter((history) => history !== item),
      ];
      if (action) action();
      return updatedHistory;
    });
  };

  const handleRemoveHistory = (item: string) => {
    setSearchHistory((prev) => {
      const updatedHistory = prev.filter((history) => history !== item);
      return updatedHistory;
    });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl w-full max-w-md">
      <h3 className="text-gray-700 font-semibold text-sm mb-4">جستجو</h3>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="عبارت مورد نظر را وارد کنید..."
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ul className="mt-4 max-h-40 overflow-y-auto">
        {query &&
          (filteredData.length ? (
            filteredData.map((item, index) => (
              <li
                key={index}
                className="p-2 border-b text-gray-600 cursor-pointer"
                onClick={() => {
                  handleSelect(item);
                }}
              >
                {item}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">موردی یافت نشد</li>
          ))}
      </ul>
      {searchHistory.length > 0 && (
        <div className="mt-4 border-t pt-2">
          <h4 className="text-sm text-gray-700 font-semibold">تاریخچه جستجو</h4>
          <ul>
            {searchHistory.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border-b text-gray-600"
              >
                {item}
                <button onClick={() => handleRemoveHistory(item)}>*</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
