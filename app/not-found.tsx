import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center pt-24">
      <Container className="text-center">
        <p className="text-xs uppercase tracking-[0.16em] text-stone">404</p>
        <h1 className="mt-4 font-display text-display leading-[0.95]">This Path Hasn&apos;t Been Carved Yet</h1>
        <p className="mt-4 text-ink-soft">The page you&apos;re looking for doesn&apos;t exist.</p>
        <div className="mt-8">
          <Button href="/">Return Home</Button>
        </div>
      </Container>
    </div>
  );
}
