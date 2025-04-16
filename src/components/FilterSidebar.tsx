
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterSidebarProps {
  subjects: FilterOption[];
  types: FilterOption[];
  levels: FilterOption[];
  onFilterChange: (filterType: string, filterId: string, checked: boolean) => void;
  selectedFilters: {
    subjects: string[];
    types: string[];
    levels: string[];
  };
  onClearFilters: () => void;
}

const FilterSidebar = ({
  subjects,
  types,
  levels,
  onFilterChange,
  selectedFilters,
  onClearFilters
}: FilterSidebarProps) => {
  const [isSubjectsOpen, setIsSubjectsOpen] = useState(true);
  const [isTypesOpen, setIsTypesOpen] = useState(true);
  const [isLevelsOpen, setIsLevelsOpen] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const anyFiltersSelected = 
    selectedFilters.subjects.length > 0 || 
    selectedFilters.types.length > 0 || 
    selectedFilters.levels.length > 0;

  return (
    <>
      {/* Mobile filter dialog */}
      <div className="sm:hidden">
        <Button 
          variant="outline" 
          onClick={() => setMobileFiltersOpen(true)}
          className="mb-4 w-full justify-center"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter
          {anyFiltersSelected && (
            <span className="ml-2 text-xs bg-library-blue-100 text-library-blue-800 rounded-full px-2 py-0.5">
              {selectedFilters.subjects.length + selectedFilters.types.length + selectedFilters.levels.length}
            </span>
          )}
        </Button>
        
        {mobileFiltersOpen && (
          <div className="fixed inset-0 flex z-50">
            <div 
              className="fixed inset-0 bg-black/30" 
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="relative w-full max-w-xs bg-white p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-4">
                <FilterSection 
                  title="Subjects" 
                  options={subjects} 
                  selectedIds={selectedFilters.subjects}
                  onChange={(id, checked) => onFilterChange('subjects', id, checked)}
                  isOpen={isSubjectsOpen}
                  onToggle={() => setIsSubjectsOpen(!isSubjectsOpen)}
                />
                
                <Separator />
                
                <FilterSection 
                  title="Resource Type" 
                  options={types} 
                  selectedIds={selectedFilters.types}
                  onChange={(id, checked) => onFilterChange('types', id, checked)}
                  isOpen={isTypesOpen}
                  onToggle={() => setIsTypesOpen(!isTypesOpen)}
                />
                
                <Separator />
                
                <FilterSection 
                  title="Academic Level" 
                  options={levels} 
                  selectedIds={selectedFilters.levels}
                  onChange={(id, checked) => onFilterChange('levels', id, checked)}
                  isOpen={isLevelsOpen}
                  onToggle={() => setIsLevelsOpen(!isLevelsOpen)}
                />
              </div>
              
              {anyFiltersSelected && (
                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onClearFilters}
                    className="w-full justify-center text-gray-600"
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t">
                <Button 
                  className="w-full"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Desktop filter sidebar */}
      <div className="hidden sm:block">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-library-blue-900 font-serif">Filters</h2>
            {anyFiltersSelected && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClearFilters}
                className="text-xs text-gray-600"
              >
                Clear all
              </Button>
            )}
          </div>
          
          <ScrollArea className="h-[calc(100vh-300px)] pr-3">
            <div className="space-y-6">
              <FilterSection 
                title="Subjects" 
                options={subjects} 
                selectedIds={selectedFilters.subjects}
                onChange={(id, checked) => onFilterChange('subjects', id, checked)}
                isOpen={isSubjectsOpen}
                onToggle={() => setIsSubjectsOpen(!isSubjectsOpen)}
              />
              
              <Separator />
              
              <FilterSection 
                title="Resource Type" 
                options={types} 
                selectedIds={selectedFilters.types}
                onChange={(id, checked) => onFilterChange('types', id, checked)}
                isOpen={isTypesOpen}
                onToggle={() => setIsTypesOpen(!isTypesOpen)}
              />
              
              <Separator />
              
              <FilterSection 
                title="Academic Level" 
                options={levels} 
                selectedIds={selectedFilters.levels}
                onChange={(id, checked) => onFilterChange('levels', id, checked)}
                isOpen={isLevelsOpen}
                onToggle={() => setIsLevelsOpen(!isLevelsOpen)}
              />
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  selectedIds: string[];
  onChange: (id: string, checked: boolean) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const FilterSection = ({
  title,
  options,
  selectedIds,
  onChange,
  isOpen,
  onToggle
}: FilterSectionProps) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle} className="w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent className="mt-2">
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option.id} className="flex items-center">
              <Checkbox
                id={`${title}-${option.id}`}
                checked={selectedIds.includes(option.id)}
                onCheckedChange={(checked) => onChange(option.id, !!checked)}
                className="text-library-blue-700 focus:ring-library-blue-500 h-4 w-4"
              />
              <label
                htmlFor={`${title}-${option.id}`}
                className="ml-2 text-sm text-gray-700 cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterSidebar;
