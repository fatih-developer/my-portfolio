import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ShadcnDemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8">
      <h1 className="text-3xl font-bold">Shadcn UI Demo</h1>
      
      <div className="flex gap-4">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="destructive">Destructive Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="ghost">Ghost Button</Button>
        <Button variant="link">Link Button</Button>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a sample card component from Shadcn UI.</p>
          <div className="flex gap-2 mt-4">
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}