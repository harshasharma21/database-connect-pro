import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Shield, Truck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { categories } from "@/data/mockData";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import foodCupboardImg from "@/assets/category-food-cupboard.jpg";
import beveragesImg from "@/assets/category-beverages.jpg";
import frozenFoodsImg from "@/assets/category-frozen-foods.jpg";
import snacksImg from "@/assets/category-snacks.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Carousel */}
        <section className="relative">
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 5000 })]}
            className="w-full"
          >
            <CarouselContent>
              {[
                { img: foodCupboardImg, category: categories.find(c => c.slug === "food-cupboard")! },
                { img: beveragesImg, category: categories.find(c => c.slug === "beverages")! },
                { img: frozenFoodsImg, category: categories.find(c => c.slug === "frozen-foods")! },
                { img: snacksImg, category: categories.find(c => c.slug === "snacks")! }
              ].map((item, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
                    <img 
                      src={item.img} 
                      alt={item.category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent">
                      <div className="container mx-auto px-4 h-full flex items-center">
                        <div className="max-w-2xl">
                          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">
                            {item.category.name}
                          </h2>
                          <p className="text-base md:text-xl lg:text-2xl mb-6 md:mb-8 text-muted-foreground">
                            Explore our wide range of {item.category.name.toLowerCase()} products. Quality assured, competitive prices.
                          </p>
                          <Button size="lg" asChild>
                            <Link to={`/shop/category/${item.category.slug}-${item.category.id}`}>
                              Browse {item.category.name}
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </section>

        {/* Trust Indicators */}
        <section className="py-8 md:py-12 bg-neutral-50 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 md:mb-3">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <h3 className="text-sm md:text-base font-semibold mb-1">Quality Assured</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Certified suppliers</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 md:mb-3">
                  <Truck className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <h3 className="text-sm md:text-base font-semibold mb-1">Fast Delivery</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Next-day available</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 md:mb-3">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <h3 className="text-sm md:text-base font-semibold mb-1">Competitive Prices</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Best wholesale rates</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 md:mb-3">
                  <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <h3 className="text-sm md:text-base font-semibold mb-1">24/7 Support</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Always here to help</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Shop by Category</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Browse our extensive range of quality food products across multiple categories
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
              {categories.filter(cat => !cat.parentId).map((category) => {
                const categoryImages: Record<string, string> = {
                  "food-cupboard": foodCupboardImg,
                  "beverages": beveragesImg,
                  "frozen-foods": frozenFoodsImg,
                  "snacks": snacksImg
                };
                
                return (
                  <Link
                    key={category.id}
                    to={`/shop/category/${category.slug}-${category.id}`}
                  >
                    <Card className="group overflow-hidden hover:shadow-elegant-hover transition-smooth cursor-pointer h-full">
                      <div className="aspect-[16/10] relative overflow-hidden">
                        <img 
                          src={categoryImages[category.slug]} 
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                        <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                          <h3 className="text-xl md:text-2xl font-bold mb-1 group-hover:text-primary transition-smooth">
                            {category.name}
                          </h3>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {category.productCount} products
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-accent to-sage-green text-accent-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Order in Bulk?
            </h2>
            <p className="text-xl mb-8 text-accent-foreground/90 max-w-2xl mx-auto">
              Use our Fast Order system to quickly add multiple items to your cart using SKUs or CSV upload
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/fast-order">
                Try Fast Order
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
