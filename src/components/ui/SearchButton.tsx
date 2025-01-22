import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchButton() {
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page reload
    console.log("Search initiated");
  };

  return (
    <form
      className="flex w-full max-w-sm items-center space-x-2"
      onSubmit={handleSearch}
    >
      <Input
        type="text"
        placeholder="Search here..."
        className="focus:ring-2 focus:ring-blue-500"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
