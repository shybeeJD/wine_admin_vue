<template>
  <div>
    <head-top></head-top>
    <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
      <el-table-column
          label="店铺名"
          prop="name">
      </el-table-column>
      <el-table-column
          label="最大配送范围"
          prop="max_range">
      </el-table-column>
      <el-table-column
          label="配送规则">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="left">
            <el-table :data="scope.row.freight">
<!--              <span></span>-->
              <el-table-column label="公里数" prop="km"></el-table-column>
              <el-table-column label="配送费" prop="cny"></el-table-column>
            </el-table>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.freight.length }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="地址" >
        <template v-slot="scope">
        <el-popover trigger="hover" placement="left">
          <p>{{"坐标："+scope.row.mapData[0]}}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.mapData[1] }}</el-tag>
          </div>
        </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="right" >
        <template #header >
          <el-input v-model="search"></el-input>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="addGood(scope.$index, scope.row)">添加商品
          </el-button>
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="Pagination">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="count">
      </el-pagination>
    </div>
    <el-dialog  title="修改商品信息" :visible.sync="dialogFormVisible">
      <edit-shop-form @updateSuccess="updateSuccess" :form="selectedRow"> </edit-shop-form>
    </el-dialog>
  </div>
</template>

<script>

import headTop from "../components/headTop";
import editShopForm from "../components/editShopForm";
import {getShopList} from "../utils/api";

export default {
  name: "shopList",
  data() {
    return {
      count : 0,
      offset: 0,
      limit : 20,
      dialogFormVisible:false,
      search:'',
      selectedRow:{},
      currentPage: 1,
      tableData: [{
        id: '1',
        name: '十八里河店',
        category: [],
        mapData: [[116.393916, 39.913491], '上海市普陀区金沙江路 1518 弄'],
        freight: [
          {km:1,cny:3}, {km:2,cny:3}, {km:3,cny:5}
        ],
        max_range: 15
      }, {
        id: '2',
        name: '二七区分店',
        category: [],

        mapData: [[116.393916, 39.913491], '上海市普陀区金沙江路 1518 弄'],
        freight: [
          {km:1,cny:3}, {km:2,cny:3}, {km:3,cny:5}
        ],
        max_range: 20
      }, {
        id: '2',
        name: '广岛分店',
        category: [],

        mapData: [[116.393916, 39.913491], '上海市普陀区金沙江路 1518 弄'],
        freight: [
          {km:1,cny:3}, {km:2,cny:3}, {km:3,cny:5}
        ],
        max_range: 33
      }, {
        id: '3',
        name: '大阪店',
        category: [],

        mapData: [[116.393916, 39.913491], '上海市普陀区金沙江路 1518 弄'],
        freight: [
          {km:1,cny:3}, {km:2,cny:3}, {km:3,cny:5}
        ],
        max_range: 55
      }]
    }
  },
  components: {
    editShopForm,
    headTop,
  },
  created() {
    this.initData();
  },

  methods: {
    async initData() {
      try {
        const shopData = await getShopList({offset: this.offset, limit: this.limit});
        console.log(shopData.data.data)
        if (shopData.status === 200) {
          //this.count = shopData.data.data.length;
          this.tableData = []
          shopData.data.data.forEach(item => {
            item=JSON.parse(item);
            const td = {};
            td.id = item._id;
            td.category = item.category
            td.name = item.name;
            td.mapData = [item.location.coordinates,item.address];
            td.freight = item.freight;
            td.max_range = item.postRange;
            this.tableData.push(td);
            console.log(td.mapData)
          })
        }else{
          throw new Error('获取数据失败');
        }

      } catch (e) {
        console.log('获取数据失败', e);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1)*this.limit;
      this.getInitialData();
    },

    addGood(index, row){
      console.log("即将进行路由跳转，参数为"+row.id)
      this.$router.push({ path: '/addGoods', query: { shop_id: row.id, shop_name:row.name, category:row.category}})
    },
    handleEdit(index, row) {
      this.selectedRow = row
      this.dialogFormVisible = true
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    updateSuccess() {
      this.dialogFormVisible = false;
      this.initData();
    },
  }
}
</script>

<style scoped>

</style>