import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { SettingsService } from '../services/settings.service';
import { Settings } from 'angularfire2/firestore';


@Injectable()
export class RegisterGuard implements CanActivate {
    constructor(
        private router: Router,
        private settingsService: SettingsService,
    ) {

    }

    canActivate(): boolean {
        if (this.settingsService.getSettings().allowRegistration) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
