import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { mockProducts, categories } from "@/data/mockData";
import { SlidersHorizontal, ChevronDown, ChevronRight, X } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Shop = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getSubcategories = (parentId: string) => {
    return categories.filter(cat => cat.parentId === parentId);
  };

  const getAllDescendantSlugs = (categoryId: string): string[] => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return [];
    
    const slugs = [category.slug];
    const children = getSubcategories(categoryId);
    
    children.forEach(child => {
      slugs.push(...getAllDescendantSlugs(child.id));
    });
    
    return slugs;
  };

  const handleCategoryChange = (categorySlug: string, checked: boolean) => {
    const category = categories.find(cat => cat.slug === categorySlug);
    if (!category) return;

    const descendantSlugs = getAllDescendantSlugs(category.id);
    
    if (checked) {
      setSelectedCategories(prev => [...new Set([...prev, ...descendantSlugs])]);
    } else {
      // When unchecking, only remove the category and its descendants
      setSelectedCategories(prev => prev.filter(slug => !descendantSlugs.includes(slug)));
    }
  };

  const filteredProducts = selectedCategories.length > 0
    ? mockProducts.filter(p => 
        selectedCategories.includes(p.category) || 
        selectedCategories.includes(p.subcategory || '')
      )
    : mockProducts;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
      return 0;
    }
  });

  const FilterContent = () => (
    <>
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="h-5 w-5" />
        <h2 className="font-semibold text-lg">Filters</h2>
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="space-y-1">
            {categories.filter(cat => !cat.parentId).map((category) => {
              const level2Categories = getSubcategories(category.id);
              const hasSubcategories = level2Categories.length > 0;
              
              return (
                <div key={category.id} className="space-y-1">
                  <div className="flex items-center space-x-2">
                    {hasSubcategories ? (
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="p-0 h-4 w-4 flex items-center justify-center"
                      >
                        {openCategories.includes(category.id) ? (
                          <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronRight className="h-3 w-3" />
                        )}
                      </button>
                    ) : (
                      <div className="w-4" />
                    )}
                    <Checkbox
                      id={category.slug}
                      checked={selectedCategories.includes(category.slug)}
                      onCheckedChange={(checked) => handleCategoryChange(category.slug, checked as boolean)}
                    />
                    <Label
                      htmlFor={category.slug}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {category.name}
                    </Label>
                  </div>

                  {/* Level 2 Subcategories */}
                  {hasSubcategories && openCategories.includes(category.id) && (
                    <div className="ml-6 space-y-1 mt-1">
                      {level2Categories.map((subcat) => {
                        const level3Categories = getSubcategories(subcat.id);
                        const hasLevel3 = level3Categories.length > 0;
                        
                        return (
                          <div key={subcat.id} className="space-y-1">
                            <div className="flex items-center space-x-2">
                              {hasLevel3 ? (
                                <button
                                  onClick={() => toggleCategory(subcat.id)}
                                  className="p-0 h-4 w-4 flex items-center justify-center"
                                >
                                  {openCategories.includes(subcat.id) ? (
                                    <ChevronDown className="h-3 w-3" />
                                  ) : (
                                    <ChevronRight className="h-3 w-3" />
                                  )}
                                </button>
                              ) : (
                                <div className="w-4" />
                              )}
                              <Checkbox
                                id={subcat.slug}
                                checked={selectedCategories.includes(subcat.slug)}
                                onCheckedChange={(checked) => handleCategoryChange(subcat.slug, checked as boolean)}
                              />
                              <Label
                                htmlFor={subcat.slug}
                                className="text-sm font-normal cursor-pointer"
                              >
                                {subcat.name}
                              </Label>
                            </div>

                            {/* Level 3 Sub-subcategories */}
                            {hasLevel3 && openCategories.includes(subcat.id) && (
                              <div className="ml-6 space-y-1 mt-1">
                                {level3Categories.map((subsubcat) => (
                                  <div key={subsubcat.id} className="flex items-center space-x-2">
                                    <div className="w-4" />
                                    <Checkbox
                                      id={subsubcat.slug}
                                      checked={selectedCategories.includes(subsubcat.slug)}
                                      onCheckedChange={(checked) => handleCategoryChange(subsubcat.slug, checked as boolean)}
                                    />
                                    <Label
                                      htmlFor={subsubcat.slug}
                                      className="text-sm font-normal cursor-pointer text-muted-foreground"
                                    >
                                      {subsubcat.name}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Stock Status */}
        <div>
          <h3 className="font-semibold mb-3">Availability</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="in-stock" defaultChecked />
              <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
                In Stock
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="out-of-stock" />
              <Label htmlFor="out-of-stock" className="text-sm font-normal cursor-pointer">
                Out of Stock
              </Label>
            </div>
          </div>
        </div>
      </div>

      <Button variant="outline" className="w-full mt-6" onClick={() => setSelectedCategories([])}>
        Clear Filters
      </Button>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-4 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">All Products</h1>
          <p className="text-sm md:text-base text-muted-foreground">Browse our complete range of wholesale food products</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {selectedCategories.length > 0 && (
                    <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                      {selectedCategories.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <FilterContent />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <p className="text-sm md:text-base text-muted-foreground">
                Showing {sortedProducts.length} products
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12 md:py-16">
                <p className="text-base md:text-lg text-muted-foreground">No products found matching your filters.</p>
                <Button variant="link" onClick={() => setSelectedCategories([])} className="mt-4">
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
