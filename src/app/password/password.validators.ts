import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidators {
    static validOldPassword(control: AbstractControl) {
        return new Promise((resolve) => {
            if (control.value !== '1234')
                resolve({ invalidOldPassword: true });
            else
                resolve(null);
        });
    }

    static passwordsShouldMatch(control: AbstractControl) {
        let newPassword = control.get('newPassword');
        let confirmPassword = control.get('confirmPassword');

        if (newPassword.value !== confirmPassword.value)
            return { passwordsShouldMatch: true };
        
        return null;
    }
    static cannotContainSpace(control: AbstractControl) :ValidationErrors | null {
        if((control.value as string).indexOf(' ') >=0)
          return { cannotContainSpace: true };

        return null;
    }
      
}
