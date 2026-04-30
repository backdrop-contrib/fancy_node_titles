<?php
/**
 * @file
 * Views integration for Fancy Node Titles.
 */

/**
 * Implements hook_views_data_alter().
 *
 * Adds a "Fancy title" field to the node base table so editors can swap it in
 * for the standard "Content: Title" field in any View. The field renders the
 * configured display title override, icon prefix, and allowed HTML for
 * content types with Fancy Node Titles enabled, and falls back to the plain
 * title for other types — so it is safe to use on Views that mix content
 * types.
 */
function fancy_node_titles_views_data_alter(&$data) {
  $data['node']['fancy_title'] = array(
    'title'      => t('Fancy title'),
    'help'       => t('The content title with display-title override, icon prefix, and allowed HTML rendered for content types that have Fancy Node Titles enabled. Falls back to the plain title for other content types.'),
    'real field' => 'title',
    'field'      => array(
      'handler'              => 'fancy_node_titles_handler_field_fancy_title',
      'click sortable'       => TRUE,
      'link_to_node default' => TRUE,
    ),
  );
}
