import { render, screen } from "@testing-library/react";

import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByRole("button", { name: /clique aqui/i })).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    // Antes este teste só verificava que o botão existia — passava sem olhar
    // classe nenhuma (C22, §2). Agora compara duas variantes de verdade.
    const { unmount } = render(<Button variant="outline">Outline</Button>);
    const outline = screen.getByRole("button", { name: /outline/i });
    expect(outline).toHaveClass("border", "bg-background");
    unmount();

    render(<Button variant="destructive">Excluir</Button>);
    const destructive = screen.getByRole("button", { name: /excluir/i });
    expect(destructive).not.toHaveClass("bg-background");
    expect(destructive.className).not.toBe(outline.className);
  });
});
