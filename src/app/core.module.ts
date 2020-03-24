import { NgModule } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { DataStorageService } from './Shared/data-storage.service';
import { RecipeService } from './recipes/recipe.service';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [
    AuthService,
    DataStorageService, 
    RecipeService, 
    RecipesResolverService,
    ShoppingListService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
})
export class CoreModule {}