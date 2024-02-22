import { useEffect, useState } from "react";
import { Root } from "../types/Tags";

export default function TagsPage() {
  const [tags, setTags] = useState<Root>();

  useEffect(() => {
    fetch(`https://cmgt.hr.nl/api/tags`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => setTags(json));
  }, []);

  return (
    <>
      <div className="flex justify-center my-2">
        <div className="grid grid-cols-2 gap-2">
          {tags?.data.map((tag) => (
            <div className="border-2 p-2 text-center rounded-lg shadow-md">
              {tag.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
