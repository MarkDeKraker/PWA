import { useEffect, useState } from "react";
import { Tag } from "../types/ShowCases";
import useOnlineStatus from "../hooks/useOnlineStatus";

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>();
  // const [hasError, setHasError] = useState<boolean>(false);
  const isOnline = useOnlineStatus();
  useEffect(() => {
    fetch(`https://cmgt.hr.nl/api/tags`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        return response.json();
      })
      .then((json) => {
        setTags(json.data);
      })
      .catch((error) => {
        console.log("There was an error", error);
      });
  }, []);

  return (
    <>
      <div className="flex justify-center my-2">
        <div className="grid grid-cols-2 gap-2">
          {isOnline ? (
            tags?.map((tag) => (
              <div
                key={tag.id}
                className="border-2 p-2 text-center rounded-lg shadow-md"
              >
                {tag.name}
              </div>
            ))
          ) : (
            <div>Tags online work when connected to a network!</div>
          )}
        </div>
      </div>
    </>
  );
}
