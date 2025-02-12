import { ApiService } from '@/app/core/api.service'
import { Injectable } from '@angular/core'
import { Resolve, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class StartupScriptResolver implements Resolve<any> {
  constructor(
    private $api: ApiService,
    private $toastr: ToastrService,
    private $router: Router,
  ) {}

  async resolve() {
    try {
      return await firstValueFrom(this.$api.get('/platform-tools/docker/startup-script'))
    } catch (err) {
      this.$toastr.error(err.message, 'Failed to Load Startup Script')
      this.$router.navigate(['/'])
    }
  }
}
