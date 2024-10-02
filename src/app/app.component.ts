import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PropertyownerComponent } from "./propertyowner/propertyowner.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PropertyownerComponent, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'technico';
}
