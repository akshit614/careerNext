import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
    <div className="flex h-screen justify-center">
      <div className="flex flex-col justify-center text-3xl">
        Hello
        <Button variant="default">Button</Button>
      </div>
    </div>
    </>
  );
}
