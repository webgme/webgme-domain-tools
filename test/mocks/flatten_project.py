"""
Transforms an exported WebGME project (json) into a suitable format for CoreMock.
"""

import os
import json
from collections import defaultdict
from optparse import OptionParser


def main(file_name, output_file=None):
    if not output_file:
        output_file = 'flat_' + file_name
    with open(file_name, 'r') as f_in:
        json_dict = json.load(f_in)

    nodes = json_dict['nodes']

    root_guid = json_dict['root']['guid']
    root_id = json_dict['root']['path']
    tree_root = {'guid': root_guid}
    nodes[root_guid]['id'] = root_id

    flatten_dict = {
        'tree': {
            json_dict['root']['path']: tree_root
        },
        'nodes': nodes
    }

    def traverse_containment(old_root, new_root, path):
        for guid, children in old_root.iteritems():
            node = nodes[guid]
            rel_id = json_dict['relids'][guid]
            child_path = '{0}/{1}'.format(path, rel_id)

            node['id'] = child_path
            add_collections(guid, node)

            tree_node = {'guid': guid}
            new_root[rel_id] = tree_node
            if children:
                traverse_containment(children, tree_node, child_path)

    def add_collections(guid, node):
        for pointer_name, pointed_to in node['pointers'].iteritems():
            if pointer_name != 'base' and pointed_to:
                if 'collection' not in nodes[pointed_to]:
                    nodes[pointed_to]['collection'] = defaultdict(list)
                nodes[pointed_to]['collection'][pointer_name].append(guid)

    traverse_containment(json_dict['containment'], tree_root, json_dict['root']['path'])

    with open(output_file, 'w') as f_out:
        json.dump(flatten_dict, f_out)

    print 'Result written to ' + os.path.abspath(output_file)

if __name__ == '__main__':
    parser = OptionParser()
    parser.add_option('-f', '--file_name', action='store', type='string',
                  help='Input json file.')
    parser.add_option('-o', '--output_file_name', action='store', type='string', default='',
                      help='Output json file name - default [flat_ + file_name].')
    (opts, args) = parser.parse_args()
    if opts.file_name:
        print 'Transforming ' + opts.file_name + '...'
        main(opts.file_name, opts.output_file_name)
    else:
        print parser.print_help()
