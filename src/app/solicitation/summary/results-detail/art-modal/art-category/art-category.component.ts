import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-art-category',
  templateUrl: './art-category.component.html',
  styleUrls: ['./art-category.component.scss']
})
export class ArtCategoryComponent {
  @Input() category: any;
  @Input() selectedCategories: any[];
  @Input() clearSelection: boolean;

  @Output() change = new EventEmitter();

  selectedSubcategories: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.clearSelection && this.clearSelection) {
      this.clearAll();
    }
  }

  clearAll() {
    this.selectedCategories = [];
    this.selectedSubcategories = [];

    this.category.subcategories.forEach(subcategory => {
      subcategory.isChecked = false
    });
  
    this.change.emit({
      selectedCategories: this.selectedCategories,
      selectedSubcategories: this.selectedSubcategories,
      parent: null
    });
    
  }

  isItemSelected(art_api: string): boolean {
    //console.log("Selected Categories: ", this.selectedCategories);
    //console.log("This Category: ", this.category)
    //console.log('Art API: ', art_api)

    const isSelectedCategory = this.selectedCategories && this.selectedCategories.some(item => item.art_api === art_api);
    const isSelectedSubcategory = this.selectedSubcategories && this.selectedSubcategories.some(item => item.art_api === art_api);

    return isSelectedCategory || isSelectedSubcategory;
  }

  onChange(item) {
    this.change.emit(item);
  }

  onParentChange(category) {    
    
    const isCategoryUnchecked = !this.selectedCategories.some(item => item.art_api === category.art_api);

    if (isCategoryUnchecked) {
      this.selectedSubcategories = this.selectedSubcategories.filter(subcategory => {
        // Check if the subcategory is in the subcategories of the category that was unchecked
        return !category.subcategories.map(sub => sub.art_api).includes(subcategory.art_api);
      });
    } 

    this.change.emit({
      selectedCategories: this.selectedCategories,
      selectedSubcategories: this.selectedSubcategories,
      parent: this.category.art_api
    });
}

  removeSubcategories(category) {
      if (category.subcategories) {
          for (let subcategory of category.subcategories) {
              let index = this.selectedSubcategories.findIndex(item => item.art_api === subcategory.art_api);
              if (index !== -1) {
                  this.selectedSubcategories.splice(index, 1);
              }
              this.removeSubcategories(subcategory);
          }
      }
}

}
