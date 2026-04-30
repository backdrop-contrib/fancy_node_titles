<?php
/**
 * @file
 * Views field handler that renders a node's "fancy" title — display title
 * override, icon prefix, and filter_xss()-cleaned HTML — falling back to the
 * plain node title when Fancy Node Titles is not enabled for the content
 * type.
 */

/**
 * Field handler: rendered fancy node title with optional link-to-node.
 *
 * Extends the core node title handler so the standard "Link this field to the
 * original piece of content" option keeps working. Views' link-wrapping path
 * (views_handler_field::render_as_link) calls l() with html => TRUE, so HTML
 * markup from filter_xss() survives the wrapping.
 */
class fancy_node_titles_handler_field_fancy_title extends views_handler_field_node {

  /**
   * Display title and icon rows, keyed by nid.
   *
   * Populated once per query in pre_render() so render() does not run a
   * database query per row.
   *
   * @var array
   */
  protected $fancy_data = array();

  /**
   * {@inheritdoc}
   *
   * Always pull nid (for the data lookup and link) and type (for the
   * enabled-types check), regardless of the link_to_node option.
   */
  public function init(&$view, &$options) {
    parent::init($view, $options);
    $this->additional_fields['nid']  = array('table' => 'node', 'field' => 'nid');
    $this->additional_fields['type'] = array('table' => 'node', 'field' => 'type');
  }

  /**
   * {@inheritdoc}
   *
   * Bulk-load fancy data for every nid in the result set, and attach the
   * module's CSS so icon alignment styles apply even on pages that do not
   * also render a full node (where hook_node_view() would otherwise attach
   * the file).
   */
  public function pre_render(&$values) {
    backdrop_add_css(backdrop_get_path('module', 'fancy_node_titles') . '/css/fancy_node_titles.css');

    $nids = array();
    foreach ($values as $value) {
      $nid = $this->get_value($value, 'nid');
      if ($nid) {
        $nids[$nid] = $nid;
      }
    }
    $this->fancy_data = array();
    if (!empty($nids)) {
      $result = db_query(
        'SELECT nid, display_title, icon FROM {fancy_node_titles_display} WHERE nid IN (:nids)',
        array(':nids' => $nids)
      );
      foreach ($result as $row) {
        $this->fancy_data[$row->nid] = $row;
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  public function render($values) {
    $nid   = $this->get_value($values, 'nid');
    $type  = $this->get_value($values, 'type');
    $title = $this->get_value($values);

    if (!fancy_node_titles_enabled($type)) {
      return $this->render_link($this->sanitize_value($title), $values);
    }

    $node = (object) array(
      'nid'           => $nid,
      'type'          => $type,
      'title'         => $title,
      'display_title' => isset($this->fancy_data[$nid]->display_title) ? $this->fancy_data[$nid]->display_title : '',
      'icon'          => isset($this->fancy_data[$nid]->icon) ? $this->fancy_data[$nid]->icon : '',
    );

    // Wrap in a class so views-specific icon alignment can be applied without
    // affecting the full-node display.
    $rendered = '<span class="fancy-node-titles-views-title">' . fancy_node_titles_get_title($node) . '</span>';
    return $this->render_link($rendered, $values);
  }
}
