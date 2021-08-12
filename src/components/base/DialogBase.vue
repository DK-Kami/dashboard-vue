<template>
  <v-dialog
    v-model="dialog"
    :max-width="maxWidth"
		:persistent="persistent"
  >
    <v-card :height="height" class="d-flex flex-column">
			<v-toolbar
				max-height="60px"
			 	dark color="primary"
			>
				<slot name="title">{{ title }}</slot>
				<v-spacer/>
				<slot name="closeIcon">
					<v-tooltip top>
						<template #activator="{ on }">
							<v-btn
								color="error"
								v-on="on"
								icon
								text
								@click="closeDialog"
							>
								<v-icon>mdi-close</v-icon>
							</v-btn>
						</template>
						Close window
					</v-tooltip>
				</slot>
			</v-toolbar>
      <v-divider />

      <slot name="beforeContent"></slot>

      <v-card-text class="overflow-y-auto">
        <slot />
      </v-card-text>

			<div class="mt-auto">
				<slot name="afterContent"></slot>
			</div>

      <v-card-actions>
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/**
 * Компонент модального окна
 */

import dialog from '@/helper/mixins/dialog';

export default {
  name: 'DialogBase',

  mixins: [dialog],

  props: {
    maxWidth: [String, Number],
    height: [String, Number],
    withClose: Boolean,
		title: String,
		persistent: Boolean,
  },

  computed: {
    withTitle() {
      return this.withClose || this.title;
    },
  },
};
</script>
