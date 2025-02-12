import { ApiService } from '@/app/core/api.service'
import { Injectable } from '@angular/core'
import { Resolve, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class ConfigEditorResolver implements Resolve<any> {
  constructor(
    private $api: ApiService,
    private $toastr: ToastrService,
    private $router: Router,
  ) {}

  async resolve() {
    try {
      const json = await firstValueFrom(this.$api.get('/config-editor'))
      return JSON.stringify(json, null, 4)
    } catch (err) {
      this.$toastr.error(err.message, 'Failed to Load Config')
      this.$router.navigate(['/'])
    }
  }
}
