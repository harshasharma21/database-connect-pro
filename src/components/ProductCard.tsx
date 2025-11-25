import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import passataImg from "@/assets/product-passata.jpg";
import pestoImg from "@/assets/product-pesto.jpg";
import pastaImg from "@/assets/product-pasta.jpg";
import orangeJuiceImg from "@/assets/product-orange-juice.jpg";
import waterImg from "@/assets/product-water.jpg";
import colaImg from "@/assets/product-cola.jpg";
import chipsImg from "@/assets/product-chips.jpg";

interface ProductCardProps {
  product: Product;
}

const productImages: Record<string, string> = {
  "product-passata": passataImg,
  "product-pesto": pestoImg,
  "product-pasta": pastaImg,
  "product-orange-juice": orangeJuiceImg,
  "product-water": waterImg,
  "product-cola": colaImg,
  "product-chips": chipsImg,
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const productImage = product.images[0] ? productImages[product.images[0]] || "/placeholder.svg" : "/placeholder.svg";

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity}x ${product.name} to cart`);
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <Card className="group overflow-hidden hover:shadow-elegant-hover transition-smooth">
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <img
          src={productImage}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-smooth"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background ${
            isLiked ? "text-destructive" : ""
          }`}
          onClick={handleToggleLike}
        >
          <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
        </Button>
        {product.stock < 50 && product.inStock && (
          <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">
            Low Stock
          </Badge>
        )}
        {!product.inStock && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Out of Stock
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <p className="text-xs text-muted-foreground font-mono">{product.sku}</p>
          {product.brand && (
            <p className="text-xs text-muted-foreground mt-1">{product.brand}</p>
          )}
        </div>

        <h3 className="font-semibold text-base mb-1 line-clamp-2 min-h-[3rem]">
          <Link to={`/product/${product.id}`} className="hover:text-primary transition-smooth">
            {product.name}
          </Link>
        </h3>

        {product.shortDescription && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl font-bold text-primary">£{product.price.toFixed(2)}</p>
            {product.packSize && (
              <p className="text-xs text-muted-foreground">{product.packSize} {product.unit}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={!product.inStock}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 text-center border-0 outline-none"
              disabled={!product.inStock}
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none"
              onClick={() => setQuantity(quantity + 1)}
              disabled={!product.inStock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            className="flex-1"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
